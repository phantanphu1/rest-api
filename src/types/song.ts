export interface ISong {
    _id: string;
    userId: any;
    title: string;
    artist: string;//tên nghệ sĩ
    duration: number;//thời lượng
    genre: string;//thể loại
    album: string;
    releaseYear: number;//năm phát hành
    imageUrl: string;
    audioUrl: string;
    rating: number;
    like: string;
}
