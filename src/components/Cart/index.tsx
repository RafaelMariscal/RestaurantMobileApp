import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../@types/CartItem";
import { Product } from "../../@types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import {
  ItemContainer,
  ProductContainer,
  QuantityContainer,
  ProductDetails,
  Image,
  Actions,
  Summary,
  TotalContainer,
} from "./styles";

interface CartProps {
  cartItems: CartItem[]
  handleCartProductsAmount: (product: Product, CartAction: "Add" | "Dec") => void
}

export function Cart({ cartItems, handleCartProductsAmount }: CartProps) {
  const thereAreItemsInCart = cartItems.length > 0;

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  return (
    <>
      {thereAreItemsInCart && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <ItemContainer>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.15.8:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ padding: 16 }}
                  onPress={() => handleCartProductsAmount(cartItem.product, "Add")}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ padding: 16 }}
                  onPress={() => handleCartProductsAmount(cartItem.product, "Dec")}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </ItemContainer>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          {thereAreItemsInCart ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color="#666">
              Seu carrinho está vazio
            </Text>
          )}
        </TotalContainer>

        <Button disabled={!thereAreItemsInCart}
          onPress={() => alert("confirmar pedido")}
        >
          Confirmar pedido
        </Button>
      </Summary>

    </>

  );
}
