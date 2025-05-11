import { useRouteError, useLocation, useNavigate } from 'react-router-dom';
import Container, { ItemGroup } from '../../components/General/Container';
import Button from '../../components/General/Button';

const getErrorMessage = (code, pathname, routeError) => {
  if (pathname === '/unauthorized' || code === '401') return "You are not authorized to perform this action.";
  if (code === '403') return "Forbidden: You do not have permission to access this resource.";
  if (code === '404') return "Page not found.";
  if (code === '500') return "Server error. Please try again later.";
  if (routeError?.status === 404) return "The page you are looking for does not exist.";
  return routeError?.message || "An unexpected error occurred.";
};

export default function RouteErrorPage() {
  const routeError = useRouteError();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const errorDisplay = getErrorMessage(code, location.pathname, error);

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
                <p className="font-4 text-neutral-600 bg-neutral-1000 p-2 br-sm"> {errorDisplay?.message || "Unexpected Error"} </p>
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