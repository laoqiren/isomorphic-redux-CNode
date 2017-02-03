export default function(id){
    console.log(`请求id为${id}的详情页`)
    return {
        data: {
            title: '我是大王',
            content: `你正在请求的文章为文章${id}`
        }
    }
}