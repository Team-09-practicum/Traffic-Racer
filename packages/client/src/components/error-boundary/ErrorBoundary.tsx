import { ReactNode, Component } from 'react';

interface IProps {
  children: ReactNode;
  renderErrorInfo: () => ReactNode;
}

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
    });

    // eslint-disable-next-line no-console
    console.error(error);
  }

  render() {
    const { hasError } = this.state;
    const { renderErrorInfo } = this.props;

    if (hasError) {
      return renderErrorInfo();
    }

    return this.props.children;
  }
}
