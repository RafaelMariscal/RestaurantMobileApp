import { useState } from "react";
import { Modal, TouchableOpacity, Platform } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import {
  Overlay,
  ModalBody,
  Header,
  Form,
  Input,
} from "./styles";

interface TableModalProps {
  visible: boolean
  onClose: () => void
  onSave: (table: string) => void
}

export default function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState("");

  function handleSaveTable() {
    setTable("");
    onSave(table);
    onClose();
  }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Overlay behavior={Platform.OS === "android" ? "height" : "padding"}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              value={table}
              keyboardType="number-pad"
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              onChangeText={setTable}
            />

            <Button
              disabled={table.length === 0}
              onPress={handleSaveTable}
            >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
