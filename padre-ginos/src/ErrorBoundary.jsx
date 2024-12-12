import { Component } from "react";
import { Link } from "@tanstack/react-router";
import { usePizzaOfTheDay } from "./usePizzaOfTheDay";

class ErrorBoundary extends Component {
    state = {hasError: false}
    constructor(props) {
        super(props);
    }
    static getDerivedStateFromError() {
        return {hasError: true}
    }
    componentDidCatch(error, info) {
        // send to TrackJS/Sentry
        console.error("ErrorBoundary caught some errors", error, info)
    } render () {
        if(this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>Uh oh!</h2>
                    <p>
                        There was an error with this page. 
                        <Link to="/">Click here</Link> to go back to home page.
                    </p>
                </div>
            )
        }
        return this.props.children;
    }
}

function EBwithHooks() {
    const potd = usePizzaOfTheDay()
    return <ErrorBoundary potd={potd}/>
}


export default ErrorBoundary