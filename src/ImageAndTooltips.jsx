import { OverlayTrigger, Popover } from "react-bootstrap";

const ImageAndTooltips = (props) => {
  //const [images] = props.data ;

  return (
    <div className="images">
      {props.images.map((image) => {
        return (
          <OverlayTrigger
            key={image.id}
            placement="bottom"
            overlay={
              <Popover id="popover-basic">
                <Popover.Header as="h3">
                  By <strong>{image.user.username}</strong>
                </Popover.Header>
                {image.description && (
                  <Popover.Body>{image.description}</Popover.Body>
                )}
              </Popover>
            }
          >
            <a
              href={image.links.html}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                key={image.id}
                src={image.urls.small}
                alt={image.alt_description}
                className="image"
              />
            </a>
          </OverlayTrigger>
        );
      })}
    </div>
  );
};

export default ImageAndTooltips;
