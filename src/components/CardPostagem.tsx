import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/CardPostagemStyles";

interface Props {
  postagem: any;
}

const CardPostagem = ({ postagem }: Props) => {
  const {
    id,
    tp_post,
    conteudo,
    autor: usuario,
    createdAt,
    titulo,
    ingredientes,
    instrucoes,
    temp_prep,
    nome_receita,
    categoria,
  } = postagem;

  const fotoPerfilUrl =
    usuario?.foto_perfil && usuario.foto_perfil.startsWith("http")
      ? usuario.foto_perfil
      : "https://res.cloudinary.com/demo/image/upload/v1682620184/default-profile.png";

  const definirCorBorda = () => {
    switch (tp_post) {
      case "recado":
        return "#A5A58D";
      case "receita":
        return "#CB997E";
      case "evento":
        return "#D4A373";
      case "promocao":
        return "#B7B7A4";
      case "estabelecimento":
        return "#DDB892";
      default:
        return "#EDEDE9";
    }
  };

  const formatarDataHora = (data: string) => {
    const dateObj = new Date(data);
    return `${dateObj.toLocaleDateString("pt-BR")} às ${dateObj.toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;
  };

  let ingredientesFormatados: any[] = [];
  let instrucoesFormatadas: string[] = [];
  let categorias: string[] = [];

  try {
    ingredientesFormatados = Array.isArray(ingredientes)
      ? ingredientes
      : JSON.parse(ingredientes || "[]");
    instrucoesFormatadas = Array.isArray(instrucoes)
      ? instrucoes
      : JSON.parse(instrucoes || "[]");
    categorias = Array.isArray(categoria)
      ? categoria
      : JSON.parse(categoria || "[]");
  } catch (e) {
    console.error("Erro ao fazer parse dos campos:", e);
  }

  return (
    <View style={[styles.card, { borderColor: definirCorBorda() }]}>
      {/* Cabeçalho */}
      <View style={styles.headerUsuario}>
        {usuario?.foto_perfil ? (
          <Image source={{ uri: fotoPerfilUrl }} style={styles.fotoPerfil} />
        ) : (
          <View style={styles.fotoPerfil}>
            <Text
              style={{
                color: "#black",
                fontSize: 10,
                textAlign: "auto",
                marginTop: 15,
                paddingLeft: 5,
              }}
            >
              Sem foto
            </Text>
          </View>
        )}
        <View>
          <Text style={styles.nomeUsuario}>{usuario?.nome}</Text>
          <Text style={styles.nickname}>@{usuario?.nickname}</Text>
        </View>
      </View>

      {/* Tipo de Post */}
      <View style={styles.tagTipoPost}>
        <Text style={styles.tagTipoText}>
          {tp_post.charAt(0).toUpperCase() + tp_post.slice(1)}
        </Text>
      </View>
      <Text style={styles.subTitulo}>Id: {id}</Text>
      {/* Título */}
      {nome_receita && <Text style={styles.titulo}>{nome_receita}</Text>}
      {titulo && <Text style={styles.titulo}>{titulo}</Text>}

      {/* Conteúdo comum */}
      {conteudo && <Text style={styles.conteudo}>{conteudo}</Text>}

      {/* Receita */}
      {tp_post === "receita" && (
        <View>
          <Text style={styles.subTitulo}>Receita: {nome_receita}</Text>
          <Text style={styles.campo}>Ingredientes: {ingredientes}</Text>
          <Text style={styles.campo}>Instruções: {instrucoes}</Text>
          <Text style={styles.campo}>Tempo de Preparo: {temp_prep}</Text>
        </View>
      )}

      {/* Instruções */}
      {instrucoesFormatadas.length > 0 && (
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.campo}>Instruções (Passo a passo):</Text>
          {instrucoesFormatadas.map((item: string, i: number) => (
            <Text key={i} style={styles.listaItemTexto}>
              • {item}
            </Text>
          ))}
        </View>
      )}

      {tp_post === "evento" && (
        <View>
          <Text style={styles.campo}>Local: {localizacao}</Text>
          <Text style={styles.campo}>Valor: R$ {valor}</Text>
          {links && (
            <Text style={styles.campo}>
              Link:{" "}
              <Text style={{ color: "#2563eb" }} selectable>
                {links}
              </Text>
            </Text>
          )}
        </View>
      )}

      {tp_post === "promocao" && (
        <View>
          {links && (
            <Text style={styles.campo}>
              Link da promoção:{" "}
              <Text style={{ color: "#2563eb" }} selectable>
                {links}
              </Text>
            </Text>
          )}
        </View>
      )}

      {/* Data e hora */}
      <Text style={styles.data}>{formatarDataHora(createdAt)}</Text>

      {/* Ações */}
      <View style={styles.interacoes}>
        <TouchableOpacity style={styles.botaoInteracao}>
          <FontAwesome name="comment-o" size={18} color="#555" />
          <Text style={styles.textoInteracao}>Comentar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoInteracao}>
          <FontAwesome name="heart-o" size={18} color="#555" />
          <Text style={styles.textoInteracao}>Curtir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoInteracao}>
          <MaterialIcons name="repeat" size={18} color="#555" />
          <Text style={styles.textoInteracao}>Repost</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardPostagem;
