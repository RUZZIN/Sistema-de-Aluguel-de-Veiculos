# Calculadora de IMC - Flutter

Esta é uma calculadora de Índice de Massa Corporal (IMC) desenvolvida em Flutter seguindo as melhores práticas.

## Funcionalidades

- Cálculo do IMC baseado em peso e altura
- Seleção de gênero (Masculino/Feminino)
- Validação de entrada para garantir dados válidos
- Interpretação do resultado do IMC
- Tabela de referência do IMC
- Interface responsiva e intuitiva

## Boas Práticas Implementadas

### 1. StatefulWidget ao invés de StatelessWidget
- O widget `Home` foi implementado como `StatefulWidget` para gerenciar adequadamente o estado das variáveis

### 2. Variáveis no State
- As variáveis `masculinoOuFeminino`, `peso`, e `altura` foram movidas para a classe `_HomeState`
- Isso permite o gerenciamento adequado do estado da aplicação

### 3. TextEditingController
- Adicionados controladores para os campos de peso e altura
- Permite melhor controle e obtenção dos valores dos campos de texto
- Limpeza adequada dos controladores no método `dispose()`

### 4. Validação de Entradas
- Implementada validação para garantir que:
  - Os campos não estejam vazios
  - Os valores sejam números válidos
  - O peso esteja entre 1 e 500 kg
  - A altura esteja entre 0.1 e 3.0 metros

### 5. Cálculo do IMC
- Lógica completa de cálculo do IMC implementada
- Interpretação automática do resultado
- Exibição clara dos resultados

### 6. UI Melhorada
- Layout responsivo com espaçamento adequado
- Cartões para exibição dos resultados
- Tabela de referência do IMC
- Cores indicativas para diferentes faixas de IMC
- Ícones nos campos de entrada para melhor UX

## Como usar

1. Selecione seu gênero
2. Digite seu peso em quilogramas
3. Digite sua altura em metros (ex: 1.75)
4. Clique em "Calcular"
5. Veja seu resultado e a interpretação do IMC

## Estrutura do Código

```
lib/
├── main.dart        # Ponto de entrada da aplicação
└── home.dart        # Widget principal com a calculadora
```

## Dependências

- `flutter`: SDK do Flutter
- `cupertino_icons`: Ícones do iOS para Material Design