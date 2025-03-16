import React from 'react';
import Link from 'next/link';

interface RedirectLinkProps {
  text?: string;
  href: string;
  linkText: string;
}

const RedirectLink: React.FC<RedirectLinkProps> = ({
  text,
  linkText,
  href,
}) => {
  return (
    <p className="mt-4 text-center text-sm">
      {text ?? ''}
      <Link href={href} className="text-blue-600 hover:underline">
        {linkText}
      </Link>
    </p>
  );
};

export default RedirectLink;
