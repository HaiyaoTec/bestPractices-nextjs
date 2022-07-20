import React, {ErrorInfo} from "react";

class ErrorBoundary extends React.Component<{ children: React.ReactNode },{hasError:boolean}> {
  constructor(props: { children: React.ReactNode }) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error:Error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error:Error, errorInfo:ErrorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2 className={'font-bold text-amber-600 text-3xl text-center'}>边缘错误!</h2>
          <button
            className={'text-center w-full mt-5 text-red-500'}
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            这是自定义一个边缘错误页面?
          </button>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

export default ErrorBoundary
