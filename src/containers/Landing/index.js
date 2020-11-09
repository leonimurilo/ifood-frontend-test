import React, { useEffect, useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import queryString from "query-string";
import { authorize } from "services/api";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { ReactComponent as Logo } from "assets/white-logo.svg";
import messages from "./messages";

export default function Landing() {
  const [params, setParams] = useState({});

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    setParams(queryParams);
  }, []);

  const renderCustomMessages = () => {
    if (params) {
      if (params.denied) {
        return (
          <p className="landing__custom-msg">
            <FormattedMessage {...messages.permissionDenied} />
          </p>
        );
      }
      if (params.expired) {
        return (
          <p className="landing__custom-msg">
            <FormattedMessage {...messages.sessionExpired} />
          </p>
        );
      }
      if (params.error) {
        return (
          <p className="landing__custom-msg">
            <FormattedMessage {...messages.unexpectedError} />
          </p>
        );
      }
      return null;
    }
  };

  return (
    <div className="landing">
      <div className="landing__dialog" role="region">
        <div className="landing__logo">
          <Logo />
        </div>
        {renderCustomMessages()}
        <h1 className="landing__message">
          <FormattedMessage {...messages.instruction} />
        </h1>
        <Button
          onClick={() => authorize()}
          kind={KIND.secondary}
          size={SIZE.large}
          shape={SHAPE.pill}
        >
          <FormattedMessage {...messages.buttonText} />
        </Button>
      </div>
    </div>
  );
}
