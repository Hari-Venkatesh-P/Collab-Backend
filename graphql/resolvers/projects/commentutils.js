const Comment = require('../../../mongo/models/comment')


const { findMemberById } = require('../member/memberutils')

const createComment = async (content,created_by) =>{
    try {
        const comment = new Comment({
            content : content,
            created_by :   created_by,
            created_at :   new Date().toISOString(),
        })
        const result = await comment.save()
        return result._id
    } catch (error) {
        throw new Error("Error while creating comment: "+error)
    }
}

const getComment = async (id) =>{
    try {
        const comment = await Comment.findOne({_id:id})
        return comment
    } catch (error) {
        throw new Error("Error while creating comment: "+error)
    }
}

const getCommentByIds = async (commentIds) =>{
    try {
        const commentList = await Comment.find({_id:{$in:commentIds}})
        return commentList.map(comment=>{
            return{
                ...comment._doc , 
                created_by:  findMemberById(comment.created_by),
            }
        })
    } catch (error) {
        throw new Error("Error while creating all comments : "+error)
    }
}

exports.getComment = getComment ;
exports.createComment = createComment ;
exports.getCommentByIds = getCommentByIds ;