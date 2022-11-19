import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../@types/CartItem";
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
}

export function Cart({ cartItems }: CartProps) {
  return (
    <>
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
                  uri: `http://192.168.15.8:3001/uploads/${cartItem.product.imagePath}`
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
              <TouchableOpacity style={{ padding: 16 }}>
                <PlusCircle />
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: 16 }}>
                <MinusCircle />
              </TouchableOpacity>
            </Actions>
          </ItemContainer>
        )}
      />

      <Summary>
        <TotalContainer>
          <Text color="#666">Total</Text>
          <Text size={20} weight="600">{formatCurrency(120)}</Text>
        </TotalContainer>

        <Button onPress={() => alert("confirmar pedido")}>
          Confirmar pedido
        </Button>
      </Summary>

    </>

  );
}
