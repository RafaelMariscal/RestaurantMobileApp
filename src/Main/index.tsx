import { useState } from "react";
import { CartItem } from "../@types/CartItem";
import { Product } from "../@types/Product";
import { Button } from "../components/Button";
import { Cart } from "../components/Cart";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import TableModal from "../components/TableModal";
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisible(false);
  }

  function handleResetOrder() {
    setSelectedTable("");
    setCartItems([]);
  }

  function handleCartProductsAmount(product: Product, CartAction: "Add" | "Dec") {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );

      if (itemIndex < 0 && CartAction === "Add") {
        return prevState.concat({
          product,
          quantity: 1
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      if (CartAction === "Add") {
        newCartItems[itemIndex] = {
          ...item,
          quantity: item.quantity + 1
        };
        return newCartItems;
      }

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu handleCartProductsAmount={handleCartProductsAmount} />
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
            <Cart
              cartItems={cartItems}
              handleCartProductsAmount={handleCartProductsAmount}
              onConfirmOrder={handleResetOrder}
            />
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
