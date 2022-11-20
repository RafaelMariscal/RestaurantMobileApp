import { Modal } from "react-native";
import { CheckCircle } from "../Icons/CheckCircle";
import { Text } from "../Text";
import { Container, OkButton } from "./styles";
import { StatusBar } from "expo-status-bar";

interface OrderConfirmedModalProps {
  visible: boolean
  onOkPressed: () => void
}
export function OrderConfirmedModal({ visible, onOkPressed }: OrderConfirmedModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
    >
      <StatusBar style="light" />

      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#FFF" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>

        <OkButton onPress={onOkPressed}>
          <Text weight="600" color="#d73035">OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
