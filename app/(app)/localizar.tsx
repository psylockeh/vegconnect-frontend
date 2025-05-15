import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { styles } from "@/styles/LocalizarEstabelecimentoStyles";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

interface Estabelecimento {
  id: number;
  nome_comercio: string;
  latitude: number;
  longitude: number;
  tipo_comercio: string;
  descricao_comercio: string;
  distancia?: number;
}

const tiposDisponiveis = ["Todos", "restaurante", "feira", "loja", "servico"];

export default function LocalizarEstabelecimento() {
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>(
    []
  );
  const [filtrados, setFiltrados] = useState<Estabelecimento[]>([]);
  const [selected, setSelected] = useState<Estabelecimento | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [busca, setBusca] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState<string>("Todos");
  const { userToken } = useContext(AuthContext);

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

          if (!Array.isArray(dados))
            throw new Error("Resposta não é um array.");

          setEstabelecimentos(dados);
          setFiltrados(dados);
        } catch (err) {
          console.error(
            "❌ Erro ao buscar estabelecimentos:",
            (err as Error).message
          );
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
        : estabelecimentos.filter((e) => e.tipo_comercio === tipo);
    const resultado = base.filter(
      (e) =>
        e.nome_comercio.toLowerCase().includes(termoNormalizado) ||
        e.tipo_comercio.toLowerCase().includes(termoNormalizado)
    );
    setFiltrados(resultado);
  };

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
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
            <TouchableOpacity
              key={tipo}
              style={[
                styles.filtroBotao,
                tipoSelecionado === tipo && styles.filtroAtivo,
              ]}
              onPress={() => aplicarFiltro(tipo)}
            >
              <Text style={styles.filtroTexto}>{tipo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.resultadosLista}>
          {filtrados.map((e) => (
            <TouchableOpacity
              key={e.id}
              style={styles.listItem}
              onPress={() => setSelected(e)}
            >
              <Text style={styles.itemTitle}>{e.nome_comercio}</Text>
              <Text style={styles.itemTipo}>{e.tipo_comercio}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.mapContainer}>
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
                icon={markerIcon}
                eventHandlers={{ click: () => setSelected(e) }}
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
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selected.nome_comercio}</Text>
          <Text style={styles.cardTipo}>{selected.tipo_comercio}</Text>
          <Text style={styles.cardDesc}>{selected.descricao_comercio}</Text>
          <TouchableOpacity>
            <Text style={styles.btn}>Ver mais detalhes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
