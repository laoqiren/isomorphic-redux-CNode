export default function(author){
    console.log(`请求作者:${author}的文章`)
    return {
        posts:[
            {
                title:'大家好呀，罗峡的帖子',
                id: 1,
                author: 'luoxia',
            },
            {
                title:'大家好呀，jane的帖子',
                id: 2,
                author: 'jane'
            },
            {
                title:'大家好呀，laoqiren的帖子',
                id: 3,
                author: 'laoqiren'
            }
        ]
    }
}