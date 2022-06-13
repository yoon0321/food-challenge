import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
const { kakao } = window;
export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;
export const Map = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  /* border: 5px solid green; */
  overflow: hidden;
`;
export const ListContainer = styled.ul`
  height: 100%;
  position: absolute;
  width: 15vw;
  right: 0;
  display: block;
  border: 0;
  z-index: 9998;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const List = styled.div`
  margin-top: 10px;
  display: block;
  padding: 10px;
  border: 1px solid red;
  border-radius: 15px;
  background-color: white;
`;

const MapContainer = ({ searchPlace, clickedValue }) => {
  //   searchPlace = clickedValue;
  const [Places, setPlaces] = useState([]);
  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    let markers = [];
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchPlace, placesSearchCB);
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }
    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      let paginationEl = document.getElementById('pagination');
      let fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        let el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    // <Container>
    <Map id="myMap">
      <div>
        <ListContainer id="result-list">
          {Places.map((item, i) => (
            <List key={i}>
              <div>
                <h5>{item.place_name}</h5>
                {item.road_address_name ? (
                  <div>
                    <span>{item.road_address_name}</span>
                    <span>{item.address_name}</span>
                  </div>
                ) : (
                  <span>{item.address_name}</span>
                )}
                <span>{item.phone}</span>
              </div>
            </List>
          ))}
          <div id="pagination"></div>
        </ListContainer>
      </div>
    </Map>
    // </Container>
  );
};

export default MapContainer;
