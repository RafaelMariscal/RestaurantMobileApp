import { useState } from "react";
import { CartItem } from "../@types/CartItem";
import { Button } from "../components/Button";
import { Cart } from "../components/Cart";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import TableModal from "../components/TableModal";
import { products } from "../mocks/products";
import {
  Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer
} from "./styles";

export default function Main() {
  const [IsTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: products[0],
      quantity: 1
    },
    {
      product: products[1],
      quantity: 2
    },
  ]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleCancelOrder() {
    setSelectedTable("");
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>

      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => { setIsTableModalVisible(true); }}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart cartItems={cartItems} />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={IsTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
