    import Image from 'next/image';
    import React from 'react';

    interface ProgressiveNextImageProps {
        imageSrc: string;
        alt: string;
    }

    interface ProgressiveNextImageState {
        isError: boolean;
    }

    export default class ProgressiveNextImage extends React.PureComponent<ProgressiveNextImageProps, ProgressiveNextImageState> {
        constructor(props: ProgressiveNextImageProps) {
            super(props);
            this.state = {
                isError: false,
            };
            this.onError = this.onError.bind(this);
        }

        onError() {
            this.setState({
                isError: true,
            });
        }

        render() {
            const { imageSrc, alt } = this.props;
            return (
                <Image
                    src={this.state.isError ? "https://example.com/errorimage.svg" : imageSrc}
                    alt={alt}
                    layout='fill'
                    onError={this.onError}
                    className='nextimage'
                />
            );
        }
    }
