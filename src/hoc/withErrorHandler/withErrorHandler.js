import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrapperComponent, axiosInstance) => {
  return class showError extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
    }
    componentWillMount() {
      this.reqInterceptor = axiosInstance.interceptors.response.use(null, error => {
        this.setState({ error: error.message });
      });
      this.resInterceptors = axiosInstance.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      });
    }
    componentWillUnmount() {
      console.log('will unmount',this.reqInterceptor,this.resInterceptors);
      axiosInstance.interceptors.request.eject(this.reqInterceptor);
      axiosInstance.interceptors.response.eject(this.resInterceptors);
    }
    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            closePopup={() => this.setState({ error: null })}
          >
            {this.state.error}
          </Modal>
          <WrapperComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};
export default withErrorHandler;
