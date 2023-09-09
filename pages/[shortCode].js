import { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';

export default function RedirectPage({ longUrl }) {
  const [count, setCount] = useState(15);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(intervalId);
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [longUrl]);

  useEffect(() => {
    if (count === 0) {
      if (longUrl) {
        window.location.href = longUrl;
      }
    }
  }, [count, longUrl]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold mb-4 text-center text-gray-700">Bijna daar... wacht {count} seconden</h1>
        <div className="mb-4 bg-gray-200 p-4 rounded text-center">
          <a href="https://partner.bol.com/click/click?p=1&amp;t=url&amp;s=1030997&amp;url=https%3A%2F%2Fwww.bol.com%2Fbe%2Fnl%2Fsf%2Fwat-bruist-in-belgie%2F&amp;f=BAN&amp;name=Wat%20bruist%20in%20Belgi%C3%AB&amp;subid=" target="_blank" rel="noopener noreferrer">
            <img src="https://www.bol.com/nl/upload/partnerprogramma/Wat_bruist_in_BE_affiliate-500x500.jpg" width="500" height="500" alt="Wat bruist in België" />
          </a>
          <img src="https://partner.bol.com/click/impression?p=1&amp;s=1030997&amp;t=url&amp;f=BAN&amp;name=Wat%20bruist%20in%20Belgi%C3%AB&amp;subid=" width="1" height="1" alt="Wat bruist in België" />
        </div>
        <button className="w-full mt-6 p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Go to Original URL
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient();
  const { shortCode } = context.params;

  const url = await prisma.shortUrl.findUnique({
    where: { shortCode },
  });

  if (!url) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      longUrl: url.longUrl,
    },
  };
}