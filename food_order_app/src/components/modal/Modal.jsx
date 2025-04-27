import { Button, Modal } from "antd";
import { useState } from "react";
import { useCartHook } from "../../hooks/useCartHook";
import styles from "./modal.module.css";
import Lottie from "lottie-react";
import animationData from "../../../public/cart.json";
import {
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_ITEM,
} from "../../utils/constants";

const ModalComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state, dispatch } = useCartHook();
  console.log(state, "state in header");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.cartModal} onClick={showModal}>
        <div className={styles.cartHolder}>
          <Lottie animationData={animationData} loop={true} />
        </div>
        <span style={{ fontSize: "1.2rem" }}>({state.items.length})</span>
      </button>

      <Modal
        footer={
          <Button type="button" onClick={handleCancel}>
            Close
          </Button>
        }
        title="Your Cart"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div style={{ height: "50vh", overflowY: "auto" }}>
          {state.items.map((item) => {
            const { meal, quantity } = item;
            return (
              <div key={meal.id} className={styles.itemWrapper}>
                <div className={styles.itemInfo}>
                  <div className={styles.shoppingCartItemImg}>
                    <img src={meal.image} alt="meal image" />
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <h4>{meal.name}</h4>
                      <span>{quantity}</span>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: INCREASE_QUANTITY,
                              payload: meal.id,
                            })
                          }
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch({
                              type: DECREASE_QUANTITY,
                              payload: meal.id,
                            })
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <p>{meal.price} </p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="removeBtn"
                    onClick={() =>
                      dispatch({ type: REMOVE_ITEM, payload: meal.id })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
