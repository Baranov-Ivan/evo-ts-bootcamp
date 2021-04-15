import { Component } from "react";
import * as React from "react";
import logo from './logo.svg';
import './App.css';

interface ExternalImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface ImagesAppState {
  error: null;
  isLoaded: boolean;
  images: ExternalImage[];
}

function api<ExternalImage>(url: string): Promise<ExternalImage> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json().then((data) => data as ExternalImage);
  });
}

class ImagesApp extends Component<{}, ImagesAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      images: []
    };
  }

  componentDidMount() {
    api<ExternalImage[]>("https://picsum.photos/v2/list?page=2&limit=30")
        .then((items) => {
          this.setState({
            isLoaded: true,
            images: items
          });
        })
        .catch((error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
  }

  render() {
    const { error, isLoaded, images } = this.state;
    if (error) {
      return (
          <div>Error!: {error == null ? "unknown error" : "known error"}</div>
      );
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <main className="img-container">
            {images.map((item) => (
                <div
                    className="img-wrapper"
                    style={{
                      width: `${(item.width * 200) / item.height}px`,
                      flexGrow: (item.width * 200) / item.height
                    }}
                >
                  <i
                      style={{
                        paddingBottom: `${(item.height / item.width) * 100}%`
                      }}
                  ></i>
                  <img key={item.download_url} src={item.download_url} alt="" />
                </div>
            ))}
          </main>
      );
    }
  }
}

export { ImagesApp as App };
