import { RemoveModalProps } from './RemoveModal.props';
import styles from './RemoveModal.module.scss';
import Title from '../Title/Title';

function RemoveModal({
  setRemoveModalState,
  removeModalState,
}: RemoveModalProps): JSX.Element | null {
  if (!removeModalState.show) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <Title size="s" typeTitle="h3">
          Are you sure you want to delete the note?
        </Title>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() =>
              setRemoveModalState({ ...removeModalState, show: false })
            }
          >
            Close
          </button>
          <button
            onClick={() =>
              setRemoveModalState({ ...removeModalState, confirm: true })
            }
            type="button"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveModal;
