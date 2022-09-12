import styled from 'styled-components';
import { useEffect, useState } from 'react';
const { kakao } = window;

const MapContainer = styled.div`
  /* border: 3px solid red; */
  width: 500px;
  height: 500px;
`;

function MapView({ clickedValue }) {
  const [latitude, setLatitude] = useState(33.450701);
  const [longitude, setLongitude] = useState(126.570667);
  useEffect(() => {
    function success(event) {
      // 성공했을 때 처리할 콜백 함수
      setLatitude(event.coords.latitude); // 위도
      setLongitude(event.coords.longitude); // 경도
    }
    function error(event) {
      // 실패 했을 때 처리할 콜백 함수
      throw event;
    }
    // 현위치의 위도와 경도를 구하는 geolocation API
    navigator.geolocation.getCurrentPosition(success, error);

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();
    // 장소 검색 위치를 center중심으로 정렬
    const center = map.getCenter();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(clickedValue, placesSearchCB, {
      sort: kakao.maps.services.SortBy.DISTANCE,
      location: center,
    });

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    const imageSrc = 'images/mark.png'; // 마커이미지의 주소입니다
    const imageSize = new kakao.maps.Size(30, 30); // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    }
  });
  return <MapContainer id="myMap"></MapContainer>;
}

export default MapView;
