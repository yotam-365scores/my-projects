import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const itemDefault={title: 'CMS Dashboard', link: '/dashboard'};

const breadcrumbs = [
  itemDefault
]

const AppBreadcrumb = (props) => {
  //const [title, setTitle] = useState(props.title);
  const breadcrumbsDisplay = breadcrumbs.map((item, index, arr) => (<BreadcrumbItem active={index === arr.length}>
    <Link to={item.link} >{item.title}</Link>
  </BreadcrumbItem>));

  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <h4 className="mb-0">{props.title || breadcrumbs[breadcrumbs.length-1].title}</h4>

          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {breadcrumbsDisplay}
              {/* <BreadcrumbItem>
                <Link to="#">{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to="#">{props.breadcrumbItem}</Link>
              </BreadcrumbItem> */}
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

AppBreadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string
}

export { AppBreadcrumb, breadcrumbs };
