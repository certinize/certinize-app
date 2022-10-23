import styles from "./index.module.css";
import PropTypes from "prop-types";
import React from "react";

const Thumbnail = ({ children, src, imgClassName, containerClassName }) => {
  return (
    <div
      className={`${styles.colCertThumbnailContainer} ${containerClassName}`}
    >
      {children}
      <a href="#thumb" aria-label="Certificate Template Thumbnail">
        <img
          className={`${styles.imageSource} ${imgClassName}`}
          src={src}
          alt="Thumbnail"
        />
      </a>
    </div>
  );
};

Thumbnail.propTypes = {
  children: PropTypes.node,
  src: PropTypes.string,
  imgClassName: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Thumbnail;
