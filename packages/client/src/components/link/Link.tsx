import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';

interface Props {
  isRouter?: boolean;
  to: string;
  className?: string;
  target?: '_blank' | '_self';
  children: React.ReactNode;
}

export const Link = (props: Props) => {
  const { isRouter = true, to, className, target = '_self', children } = props;

  const navigate = useNavigate();

  const handleRouterLinkClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!isRouter) {
        return;
      }

      event.preventDefault();
      navigate(to);
    },
    [isRouter, navigate, to]
  );

  return (
    <Typography.Link className={className} target={target} href={to} onClick={handleRouterLinkClick}>
      {children}
    </Typography.Link>
  );
};
