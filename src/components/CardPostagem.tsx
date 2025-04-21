import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/CardPostagemStyles";

interface Props {
  postagem: any;
}

const CardPostagem = ({ postagem }: Props) => {
  const {
    tp_post,
    conteudo,
    autor: usuario,
    createdAt,
    titulo,
    ingredientes,
    instrucoes,
    temp_prep,
    nome_receita,
    descricao_comercio,
    tp_comida,
    hora_abertura,
    hora_fechamento,
    endereco,
    localizacao,
    valor,
    links,
  } = postagem;

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

  const formatarData = (data: string) => {
    const dataObj = new Date(data);
    if (isNaN(dataObj.getTime())) return "Data inválida";
    return dataObj.toLocaleDateString("pt-BR");
  };

  const fotoPerfilUrl =
    usuario?.foto_perfil && usuario.foto_perfil.startsWith("http")
      ? usuario.foto_perfil
      : "https://res.cloudinary.com/demo/image/upload/v1682620184/default-profile.png";

  return (
    <View style={[styles.card, { borderColor: definirCorBorda() }]}>
      {/* Cabeçalho */}
      <View style={styles.headerUsuario}>
        <Image source={{ uri: fotoPerfilUrl }} style={styles.fotoPerfil} />
        <View>
          <Text style={styles.nomeUsuario}>{usuario?.nome}</Text>
          <Text style={styles.nickname}>@{usuario?.nickname}</Text>
        </View>
      </View>

      {/* Tag de tipo */}
      <View style={styles.tagTipoPost}>
        <Text style={styles.tagTipoText}>
          {postagem.tp_post.charAt(0).toUpperCase() + postagem.tp_post.slice(1)}
        </Text>
      </View>

      {/* Título */}
      {titulo && <Text style={styles.titulo}>{titulo}</Text>}

      {/* Conteúdo comum */}
      {conteudo && <Text style={styles.conteudo}>{conteudo}</Text>}

      {/* Campos personalizados por tipo */}
      {tp_post === "receita" && (
        <View>
          <Text style={styles.subTitulo}>Receita: {nome_receita}</Text>
          <Text style={styles.campo}>Ingredientes: {ingredientes}</Text>
          <Text style={styles.campo}>Instruções: {instrucoes}</Text>
          <Text style={styles.campo}>Tempo de Preparo: {temp_prep}</Text>
        </View>
      )}

      {tp_post === "estabelecimento" && (
        <View>
          <Text style={styles.campo}>Descrição: {descricao_comercio}</Text>
          <Text style={styles.campo}>Tipo de comida: {tp_comida}</Text>
          <Text style={styles.campo}>
            Horário: {hora_abertura} às {hora_fechamento}
          </Text>
          <Text style={styles.campo}>Endereço: {endereco}</Text>
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

      {/* Data */}
      <Text style={styles.data}>{formatarData(createdAt)}</Text>

      {/* Interações */}
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
