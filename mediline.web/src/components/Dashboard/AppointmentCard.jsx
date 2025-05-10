import React from 'react';
import BaseIcon from '../General/BaseIcon';
import CommonIcon from '../General/CommonIcon';
import Container, { ItemGroup } from '../../components/General/Container';

const AppointmentCard = ({ data }) => {
  const { doctor: doctorName, specialization, time, type } = data;
  return (
    <>
    
    <Container
      fitParent={true}
      customClass="br-md bg-neutral-1100"
      headerClass="p-5"
      header={[
        <>
          <ItemGroup
            customClass="gap-5"
            fitParent={true}
            stretch={true}
            axis={true}
            items={[
                <>
                  <ItemGroup
                    customClass="gap-5 col-gap-10 align-items-center justify-content-center"
                    fitParent={true}
                    stretch={true}
                    axis={false}
                    items={[
                        <>
                          <BaseIcon xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 61.8 61.8">
                            <g id="Layer_2" data-name="Layer 2">
                              <g id="_ÎÓÈ_1" data-name="—ÎÓÈ 1">
                                <circle cx="30.9" cy="30.9" r="30.9" fill="#58b0e0"></circle>
                                <path
                                  fill="#f9dca4"
                                  fillRule="evenodd"
                                  d="m23.255 38.68 15.907.121v12.918l-15.907-.121z"
                                ></path>
                                <path
                                  fill="#e6e6e6"
                                  fillRule="evenodd"
                                  d="M43.971 58.905a30.97 30.97 0 0 1-25.843.14V48.417H43.97z"
                                ></path>
                                <path
                                  fill="#e9573e"
                                  fillRule="evenodd"
                                  d="M33.403 61.7q-1.238.099-2.503.1-.955 0-1.895-.057l1.03-8.988h2.41z"
                                ></path>
                                <path
                                  fill="#677079"
                                  fillRule="evenodd"
                                  d="M25.657 61.332A34 34 0 0 1 15.9 57.92a31 31 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 5.212 1.711 13.482 2.405 18.95z"
                                ></path>
                                <path
                                  fillRule="evenodd"
                                  d="M39.165 38.759v3.231c-4.732 5.527-13.773 4.745-15.8-3.412z"
                                  opacity="0.11"
                                ></path>
                                <path
                                  fill="#ffe8be"
                                  fillRule="evenodd"
                                  d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266"
                                ></path>
                                <path
                                  fill="#f9dca4"
                                  fillRule="evenodd"
                                  d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a32 32 0 0 1-1.472-7.659zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a32 32 0 0 0 1.471-7.658"
                                ></path>
                                <path
                                  fill="#464449"
                                  fillRule="evenodd"
                                  d="M21.931 14.328c-3.334 3.458-2.161 13.03-2.161 13.03l-1.05-.495c-6.554-25.394 31.634-25.395 25.043 0l-1.05.495s1.174-9.572-2.16-13.03c-4.119 3.995-14.526 3.974-18.622 0"
                                ></path>
                                <path
                                  fill="#677079"
                                  fillRule="evenodd"
                                  d="M36.767 61.243a30.86 30.86 0 0 0 17.408-10.018l-1.09-2.631-13.924-6.212c0 5.212-1.7 13.393-2.394 18.861"
                                ></path>
                                <path
                                  fill="#fff"
                                  fillRule="evenodd"
                                  d="m39.162 41.98-7.926 6.465 6.573 5.913s1.752-9.704 1.353-12.378"
                                ></path>
                                <path
                                  fill="#fff"
                                  fillRule="evenodd"
                                  d="m23.253 41.98 7.989 6.465-6.645 5.913s-1.746-9.704-1.344-12.378"
                                ></path>
                                <path
                                  fill="#e9573e"
                                  fillRule="evenodd"
                                  d="m28.109 51.227 3.137-2.818 3.137 2.818-3.137 2.817z"
                                ></path>
                                <path
                                  fill="#434955"
                                  fillRule="evenodd"
                                  d="M25.767 61.373a31 31 0 0 1-3.779-.88 3 3 0 0 1-.114-.093l-3.535-6.39 4.541-3.26h-4.752l1.017-6.851 4.11-2.599c.178 7.37 1.759 15.656 2.512 20.073M36.645 61.266c.588-.098 1.17-.234 1.747-.384a57 57 0 0 0 2.034-.579l.134-.043 3.511-6.315-4.541-3.242h4.752l-1.017-6.817-4.11-2.586c-.178 7.332-1.758 15.571-2.51 19.966"
                                ></path>
                              </g>
                            </g>
                          </BaseIcon>
                          <div>
                            <div>{doctorName}</div>
                            <div className="specialization">{specialization}</div>
                          </div>
                          <div>
                            <div><CommonIcon name={'calendar'} />{time.date}</div>
                            <div><CommonIcon name={'clock'} />{time.time}</div>
                          </div>
                          <div><CommonIcon name={'camera'} />{type}</div>
                        </>
                    ]}
                  />
                </>
              ]}
            />
          </>
        ]}
      />
    </>
  );
};

export default AppointmentCard;
