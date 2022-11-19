import { useState } from "react";
import { Button } from "../components/Button";
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
