import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { styles } from "@/styles/LocalizarEstabelecimentoStyles";
import CarrosselImagens from "@/components/CarrosselImagens";
import { buscarDetalhes, DetalhesGoogle } from "@/services/googlePlaces";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "@/context/AuthContext";
import { MotiView } from "moti";
import { StyleProp, ViewStyle } from "react-native";
import MiniCardEstabelecimento from "@/components/postagens/MiniCardEstabelecimento";

interface Estabelecimento {
  id: number;
  nome_comercio: string;
  latitude: number;
  longitude: number;
  tipo_comercio: string;
  descricao_comercio: string;
  distancia?: number;
  place_id?: string;
  fotos?: string[];
  rating?: number;
  preco?: number;
  horario?: string[];
}

const tiposDisponiveis = ["Todos", "Vegano", "Vegetariano", "Feira"];

const formatarFaixaPreco = (preco?: number) => {
  switch (preco) {
    case 0:
      return "Gratuito";
    case 1:
      return "$ (barato)";
    case 2:
      return "$$ (moderado)";
    case 3:
      return "$$$ (caro)";
    case 4:
      return "$$$$ (muito caro)";
    default:
      return "Não informado";
  }
};

export default function LocalizarEstabelecimento() {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(
    []
  );
  const [filtrados, setFiltrados] = useState<Estabelecimento[]>([]);
  const [selected, setSelected] = useState<Estabelecimento | null>(null);
  const [selectedDetalhes, setSelectedDetalhes] = useState<DetalhesGoogle>({
    fotos: [],
    rating: 0,
  });
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [busca, setBusca] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState<string>("Todos");
  const { userToken } = useContext(AuthContext);
  const { width: screenWidth } = useWindowDimensions();
  const isColumnLayout = screenWidth < 768;
  const sidebarWidth = isColumnLayout ? screenWidth : 340;
  const containerStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    styles.container,
    { flexDirection: isColumnLayout ? ("column" as const) : ("row" as const) },
  ]);
  const sidebarStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    styles.sidebar,
    { width: isColumnLayout ? "100%" : sidebarWidth },
  ]);
  const mapContainerStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
    styles.mapContainer,
    isColumnLayout && { width: "100%", minHeight: 300 },
  ]);

  const mapRef = useRef<any>(null);

  const buscarViaGoogle = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://vegconnect-backend.onrender.com/externo/google/places?lat=${latitude}&lng=${longitude}`
      );
      if (!response.ok) throw new Error("Erro na API externa");
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Erro ao buscar via Google:", error);
      return [];
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setUserLocation({ latitude, longitude });

        try {
          if (!userToken) throw new Error("Token não encontrado.");

          const resposta = await fetch(
            `https://vegconnect-backend.onrender.com/usuario/estabelecimentos?lat=${latitude}&lng=${longitude}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          if (!resposta.ok) throw new Error("Erro na resposta do servidor.");

          const dados = await resposta.json();
          const viaGoogle = await buscarViaGoogle(latitude, longitude);
          const combinados = [...dados, ...viaGoogle];
          setEstabelecimentos(combinados);
          setFiltrados(combinados);
        } catch (err) {
          console.error("Erro ao buscar estabelecimentos:", err);
          setEstabelecimentos([]);
          setFiltrados([]);
        }
      });
    }
  }, [userToken]);

  const aplicarFiltro = (tipo: string, termo = busca) => {
    setTipoSelecionado(tipo);
    const termoNormalizado = termo.trim().toLowerCase();
    const base =
      tipo === "Todos"
        ? estabelecimentos
        : estabelecimentos.filter(
            (e) => e.tipo_comercio.toLowerCase() === tipo.toLowerCase()
          );
    const resultado = base.filter(
      (e) =>
        e.nome_comercio.toLowerCase().includes(termoNormalizado) ||
        e.tipo_comercio.toLowerCase().includes(termoNormalizado)
    );
    setFiltrados(resultado);
  };

  const markerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -36],
  });

  const googleIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -36],
  });

  const handleSelect = async (e: Estabelecimento) => {
    setSelected(e);
    if (e.id >= 100000 && e.place_id) {
      const detalhes = await buscarDetalhes(e.place_id);
      setSelectedDetalhes(detalhes);
    } else {
      setSelectedDetalhes({
        fotos: e.fotos || [],
        rating: e.rating || 0,
        preco: e.preco || undefined,
        horario: Array.isArray(e.horario) ? e.horario : [],
      });
    }
  };

  return (
    <View style={containerStyle}>
      {/* SIDEBAR */}
      <MotiView
        from={{ opacity: 0, transform: [{ translateX: -100 }] }}
        animate={{ opacity: 1, transform: [{ translateX: 0 }] }}
        transition={{ duration: 600 }}
        style={sidebarStyle}
      >
        <Text style={styles.logo}>🌱 VegConnect</Text>
        <TextInput
          placeholder="Buscar por nome ou tipo..."
          placeholderTextColor="#ccc"
          style={styles.input}
          value={busca}
          onChangeText={(text) => {
            setBusca(text);
            aplicarFiltro(tipoSelecionado, text);
          }}
        />
        <View style={styles.filtroContainer}>
          {tiposDisponiveis.map((tipo) => (
            <Pressable
              key={tipo}
              style={[
                styles.filtroBotao,
                tipoSelecionado === tipo && styles.filtroAtivo,
              ]}
              onPress={() => aplicarFiltro(tipo)}
            >
              <Text style={styles.filtroTexto}>{tipo}</Text>
            </Pressable>
          ))}
        </View>
        <ScrollView style={styles.resultadosLista}>
          {filtrados.map((e) => (
            <Pressable
              key={e.id}
              style={styles.listItem}
              onPress={() => {
                handleSelect(e);
                mapRef.current?.flyTo([e.latitude, e.longitude], 16);
              }}
            >
              <Text style={styles.itemTitle}>{e.nome_comercio}</Text>
              <Text style={styles.itemTipo}>{e.tipo_comercio}</Text>
              <Text style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
                🕒{" "}
                {Array.isArray(e.horario)
                  ? e.horario[0]
                  : "Horário não informado"}
              </Text>
              <Text style={{ fontSize: 13, color: "#555" }}>
                💸 Faixa de preço: {formatarFaixaPreco(e.preco)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </MotiView>

      {/* MAPA */}
      <View style={mapContainerStyle}>
        {userLocation && (
          <MapContainer
            center={[userLocation.latitude, userLocation.longitude]}
            zoom={14}
            style={styles.map}
            scrollWheelZoom={true}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtrados.map((e) => (
              <Marker
                key={e.id}
                position={[e.latitude, e.longitude]}
                icon={e.id >= 100000 ? googleIcon : markerIcon}
                eventHandlers={{
                  click: () => handleSelect(e),
                }}
              >
                {selected && userLocation && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 20,
                      left: 0,
                      right: 0,
                      alignItems: "center",
                      zIndex: 999,
                    }}
                  >
                    <MiniCardEstabelecimento
                      fotos={selectedDetalhes.fotos}
                      nome={selected.nome_comercio}
                      tipo={selected.tipo_comercio}
                      endereco={selected.descricao_comercio}
                      rating={selectedDetalhes.rating}
                      horario={selectedDetalhes.horario}
                    />
                  </View>
                )}
              </Marker>
            ))}
          </MapContainer>
        )}

        {selected && (
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 0,
              right: 0,
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <MiniCardEstabelecimento
              fotos={selectedDetalhes.fotos}
              nome={selected.nome_comercio}
              tipo={selected.tipo_comercio}
              endereco={selected.descricao_comercio}
              rating={selectedDetalhes.rating}
              horario={selectedDetalhes.horario}
              preco={selectedDetalhes.preco}
              onClose={() => setSelected(null)}
            />
          </View>
        )}
      </View>
    </View>
  );
}
