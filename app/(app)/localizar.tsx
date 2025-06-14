import React, { useEffect, useState, useContext } from "react";
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
import { motion } from "framer-motion";

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
}

const tiposDisponiveis = ["Todos", "Vegano", "Vegetariano", "Feira"];

export default function LocalizarEstabelecimento() {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(
    [],
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
  const containerStyle = StyleSheet.flatten([
    styles.container,
    { flexDirection: isColumnLayout ? "column" : "row" },
  ]);
  const sidebarStyle = StyleSheet.flatten([
    styles.sidebar,
    { width: isColumnLayout ? "100%" : sidebarWidth },
  ]);
  const mapContainerStyle = StyleSheet.flatten([
    styles.mapContainer,
    isColumnLayout && { width: "100%", minHeight: 300 },
  ]);

  const buscarViaGoogle = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://vegconnect-backend.onrender.com/externo/google/places?lat=${latitude}&lng=${longitude}`,
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
            },
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
            (e) => e.tipo_comercio.toLowerCase() === tipo.toLowerCase(),
          );
    const resultado = base.filter(
      (e) =>
        e.nome_comercio.toLowerCase().includes(termoNormalizado) ||
        e.tipo_comercio.toLowerCase().includes(termoNormalizado),
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
      });
    }
  };

  return (
    <View style={containerStyle}>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={tipo}
              style={{
                ...styles.filtroBotao,
                ...(tipoSelecionado === tipo ? styles.filtroAtivo : {}),
              }}
              onClick={() => aplicarFiltro(tipo)}
            >
              <Text style={styles.filtroTexto}>{tipo}</Text>
            </motion.button>
          ))}
        </View>

        <ScrollView style={styles.resultadosLista}>
          {filtrados.map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Pressable
                style={styles.listItem}
                onPress={() => handleSelect(e)}
              >
                <Text style={styles.itemTitle}>{e.nome_comercio}</Text>
                <Text style={styles.itemTipo}>{e.tipo_comercio}</Text>
              </Pressable>
            </motion.div>
          ))}
        </ScrollView>
      </motion.div>

      <View style={mapContainerStyle}>
        {userLocation && (
          <MapContainer
            center={[userLocation.latitude, userLocation.longitude]}
            zoom={14}
            style={styles.map}
            scrollWheelZoom={true}
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
                eventHandlers={{ click: () => handleSelect(e) }}
              >
                <Popup>
                  <strong>{e.nome_comercio}</strong>
                  <br />
                  {e.tipo_comercio}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </View>

      {selected && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={styles.card}
        >
          <View style={styles.carouselContainer}>
            <CarrosselImagens fotos={selectedDetalhes.fotos} />
          </View>
          <Text style={styles.cardTitle}>{selected.nome_comercio}</Text>
          <Text style={styles.cardTipo}>{selected.tipo_comercio}</Text>
          <View style={styles.starRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <MaterialIcons
                key={i}
                name={
                  i < Math.round(selectedDetalhes.rating)
                    ? "star"
                    : "star-border"
                }
                size={20}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.cardDesc}>{selected.descricao_comercio}</Text>
          <Pressable>
            <Text style={styles.btn}>Ver mais detalhes</Text>
          </Pressable>
        </motion.div>
      )}
    </View>
  );
}
