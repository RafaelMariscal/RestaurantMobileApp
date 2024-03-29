import { useState } from "react";
import { FlatList } from "react-native";
import { Product } from "../../@types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import ProductModal from "../ProductModal";
import { Text } from "../Text";
import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton
} from "./styles";

interface MenuProps {
  products: Product[]
  handleCartProductsAmount: (product: Product, cartAction: "Add" | "Dec") => void
}

export function Menu({ products, handleCartProductsAmount }: MenuProps) {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  function handleOpenProductModal(product: Product) {
    setIsProductModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isProductModalVisible}
        onClose={() => setIsProductModalVisible(false)}
        product={selectedProduct}
        handleCartProductsAmount={handleCartProductsAmount}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}

        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleOpenProductModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.15.8:3001/uploads/${product.imagePath}`
              }}

            />
            <ProductDetails>
              <Text weight="600">
                {product.name}
              </Text>
              <Text size={14} color={"#666"} style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton onPress={() => handleCartProductsAmount(product, "Add")}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>

  );
}
