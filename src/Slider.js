import React, { Component } from "react";
import * as T from "prop-types";
import { Carousel } from "react-responsive-carousel";
import "mocka-placeholder";

/* Custom Stuff */
import "./Slider.css";
import ContentMember from "./ContentMember";

/* Slider shows a series of image links related to current events at MM */
class Slider extends Component {
  static propTypes = {
    pbSliderListData: T.array,
    corpSliderListData: T.array
  };

  render() {
    /* production - use images from SharePoint */
    const images =
      this.props.pbSliderListData && this.props.corpSliderListData
        ? this.props.pbSliderListData.concat(this.props.corpSliderListData)
        : undefined;

    /* prepare images for rendering as slides */
    const preparedImages = images
      ? images.map((item, index) => (
        <div
          className="carousel-image-container"
          key={`Carousel_${item.ID}` || `Carousel_${index}`}
        >
          <a
            href={
              item.EnterpriseSliderLink ? item.EnterpriseSliderLink.Url : "#"
            }
          >
            <img alt="" src={item.EnterpriseSliderImage.Url || ""} />
          </a>
          <p className="legend">{item.EnterpriseSliderDescription || ""}</p>
        </div>
      ))
      : undefined;

    return (
      <ContentMember id="Slider" icon="Megaphone" title="Communications">
        {!preparedImages && (
          <div className="mocka-container">
            <span className="mocka-media" />
            <span className="mocka-heading" />
            <span className="mocka-text" />
          </div>
        )}

        {preparedImages && (
          <Carousel
            axis="horizontal"
            autoPlay
            interval={5000}
            stopOnHover
            showThumbs={false}
            showArrows
            showStatus
            showIndicators={false}
            dynamicHeight={false}
            infiniteLoop
            useKeyboardArrows={false}
          >
            {preparedImages}
          </Carousel>
        )}
      </ContentMember>
    );
  }
}

export default Slider;
