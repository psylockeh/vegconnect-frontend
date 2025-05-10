import os

pastas = ["./src", "./app"]
hooks = ["useState", "useEffect", "useContext", "useReducer", "useMemo", "useCallback"]
estruturas_proibidas = ["if", "for", "while", "switch", "try", "catch"]

violacoes = []

def analisar_arquivo(caminho):
    try:
        with open(caminho, "r", encoding="utf-8") as f:
            linhas = f.readlines()
    except:
        return

    dentro_de_bloco = False
    for i, linha in enumerate(linhas):
        l = linha.strip()

        if any(l.startswith(estr + " ") or l.startswith(estr + "(") for estr in estruturas_proibidas):
            dentro_de_bloco = True

        if "}" in l:
            dentro_de_bloco = False

        for hook in hooks:
            if hook in l and dentro_de_bloco:
                violacoes.append((caminho, i + 1, l))

def varrer_projeto():
    for pasta in pastas:
        for raiz, _, arquivos in os.walk(pasta):
            for nome_arquivo in arquivos:
                if nome_arquivo.endswith(".tsx"):
                    analisar_arquivo(os.path.join(raiz, nome_arquivo))

varrer_projeto()

# Salvar o resultado em um arquivo .txt
nome_arquivo_saida = "violacoes_hooks.txt"
with open(nome_arquivo_saida, "w", encoding="utf-8") as f:
    if not violacoes:
        f.write("✅ Nenhum uso inválido de hook encontrado.\n")
    else:
        for arq, linha, conteudo in violacoes:
            f.write(f"{arq} (linha {linha}): {conteudo}\n")

print(f"\n✅ Análise concluída. Resultado salvo em: {nome_arquivo_saida}")
