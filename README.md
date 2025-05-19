# Rick and Morty App

Este é um aplicativo React Native desenvolvido com Expo que permite explorar personagens do universo Rick and Morty, favoritar seus preferidos e navegar facilmente entre as páginas. O projeto foi pensado para proporcionar uma experiência agradável e prática, inclusive para uso com apenas uma mão.

## Funcionalidades

- **Listagem de Personagens:** Navegue por páginas de personagens da API oficial do Rick and Morty.
- **Favoritos:** Toque no ícone de coração para favoritar/desfavoritar personagens. A lista de favoritos pode ser acessada a qualquer momento.
- **HUD Interativo:** O HUD na parte inferior da tela exibe botões de navegação e um coração animado. O coração só fica cheio (vermelho) quando há personagens favoritados, indicando visualmente o status dos seus favoritos.
- **Acesso Rápido aos Favoritos:** O botão de coração no HUD foi posicionado e dimensionado para facilitar o uso com apenas uma mão, tornando a navegação mais confortável em dispositivos móveis.
- **Animações Suaves:** Tanto o coração do HUD quanto os cards de personagens possuem animações para tornar a experiência mais divertida e responsiva.
- **Modo Favoritos:** Uma tela dedicada mostra todos os personagens favoritados, permitindo remover favoritos facilmente.
- **Design Acessível:** O layout, cores e botões foram pensados para facilitar o uso com uma mão só, inclusive para canhotos, com botões de navegação acessíveis nos dois lados da tela.

## Bibliotecas Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [@react-navigation/native](https://reactnavigation.org/)
- [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator/)
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [expo-status-bar](https://docs.expo.dev/versions/latest/sdk/status-bar/)

## Detalhes Técnicos

- **Armazenamento Local:** Os favoritos são salvos localmente usando AsyncStorage, garantindo persistência mesmo após fechar o app.
- **Animações:** O coração do HUD possui animação ao ser pressionado, e os cards de personagens também possuem animações sutis para melhorar a experiência do usuário.
- **Design Responsivo:** As cores e espaçamentos foram pensados para proporcionar boa legibilidade e conforto visual, com destaque para o tema escuro e cores vibrantes para elementos de ação.
- **Navegação:** Utiliza navegação em pilha (stack) para alternar entre a tela principal e a tela de favoritos.
- **Componentização:** O código é organizado em componentes reutilizáveis, como `CharacterCard` e `Hud`, facilitando manutenção e expansão.
- **Acessibilidade:** Botões grandes, contraste de cores e feedback visual garantem boa usabilidade para todos os públicos.
- **Performance:** O uso de FlatList e animações otimizadas garante boa performance mesmo em listas grandes.

## Como rodar

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o projeto:
   ```sh
   npm start
   ```
3. Use o Expo Go ou um emulador para visualizar o app.

---

Desenvolvido com carinho para fãs de Rick and Morty!
