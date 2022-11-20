import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { CartItem } from "../@types/CartItem";
import { Product } from "../@types/Product";
import { Category } from "../@types/Category";
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Menu } from "../components/Menu";
import { Empty } from "../components/Icons/Empty";
import { Cart } from "../components/Cart";
import TableModal from "../components/TableModal";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { api } from "../utils/api";

import {
  Container,
  CategoriesContainer,
  MenuContainer,
  CenteredContainer,
  Footer,
  FooterContainer
} from "./styles";

export default function Main() {
  const [IsTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get("/categories"),
      api.get("/products"),
    ]).then(([categoriesRes, productsRes]) => {
      console.log({
        getCategoriesStatus: categoriesRes.status,
        getProductsStatus: productsRes.status,
      });
      setCategories(categoriesRes.data);
      setProducts(productsRes.data);
      setIsLoading(false);
    });
  }, []);

  async function handleSelectedCategory(categoryId: string) {
    const route = !categoryId ?
      "/products" : `/categories/${categoryId}/products`;
    setIsLoadingProducts(true);
    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }


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

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size={"large"} />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectedCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#d73035" size={"large"} />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu
                      products={products}
                      handleCartProductsAmount={handleCartProductsAmount}
                    />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}



          </>
        )}

      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
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
