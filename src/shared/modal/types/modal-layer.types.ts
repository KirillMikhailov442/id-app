export interface ModalLayer {
  id: string;
  close: () => void;
  canDismiss: () => boolean;
}
