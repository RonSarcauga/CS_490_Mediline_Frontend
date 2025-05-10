import { useRouteError, useLocation, useNavigate } from 'react-router-dom';
import Container, { ItemGroup } from '../../components/General/Container';
import Button from '../../components/General/Button';

export default function RouteErrorPage() {
  const error = useRouteError();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const code = params.get('code');

  const errorMessage = code === '401'
    ? "You are not authorized to do that"
    : null;

  const errorDisplay = errorMessage || error?.message || "An unexpected error occurred.";

  console.error("Route error:", errorDisplay);

  return (
    <Container
      fitScreen={true}
      customClass="bg-secondary-500 align-items-center justify-content-center"
      content={[
        <>
          <ItemGroup
            axis={true}
            customClass="p-20 pb-10 pt-10 align-items-center justify-items-center bg-neutral-1100 br-lg box-shadow-sm"
            items={[
              <>
                <h1 className="font-15 font-bold text-warning-300">Oops!</h1>
                <h1 className="font-15 font-semibold ">Something went wrong.</h1>
                <br/>
                <h2 className="font-5 text-neutral-600">We couldn’t load this page.</h2>
                <br/>
                <p className="font-4 text-neutral-600 bg-neutral-1000 p-2 br-sm"> {errorDisplay?.message || "Unexpected error"} </p>
                <br/>
                <ItemGroup
                  axis={false}
                  stretch={true}
                  customClass="col-gap-5"
                  items={[
                      <>
                        <Container
                            customClass='bg-dark-100 justify-items-center align-items-center br-sm py-1'
                            isClickable={true}
                            onClick={() => window.location.reload()}
                            content={[
                                <Button
                                    customClass="bg-0"
                                    content={[
                                        <p className="font-5 text-decoration-none font-regular text-neutral-1100">
                                            Reload Page
                                        </p>
                                    ]}
                                />
                            ]}
                        />
                        <Container
                            customClass='bg-dark-100 justify-items-center align-items-center br-sm py-1'
                            isClickable={true}
                            onClick={() => navigate(`/`)}
                            content={[
                                <Button
                                    customClass="bg-0"
                                    content={[
                                        <p className="font-5 text-decoration-none font-regular text-neutral-1100">
                                            Return Home
                                        </p>
                                    ]}
                                />
                            ]}
                          />
                        </>
                      ]}
                    />
              </>
            ]}
          />
        </>
      ]}
    />
  );
}