import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);
  const [scope, animate] = useAnimate();

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (!challenge.title.trim()) {
      animate(
        "#title",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.3 }
      );
      return;
    } else if (!challenge.description.trim()) {
      animate(
        "#description",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.3 }
      );
      return;
    } else if (!challenge.deadline.trim()) {
      animate(
        "#deadline",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.3 }
      );
      return;
    } else if (!challenge.image) {
      animate(
        "li",
        { x: [-10, 0, 10, 0] },
        { type: "spring", duration: 0.3, delay: stagger(0.05) }
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  };

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          id="new-challenge-images"
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
        >
          {images.map((image) => (
            <motion.li
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.5,
                },
                visible: {
                  opacity: 1,
                  scale: [0.9, 1.1, 1],
                },
              }}
              exit={{
                opacity: 1,
                scale: 1,
              }}
              transition={{ type: "spring" }}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
