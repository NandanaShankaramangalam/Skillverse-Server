// import { UpdateResult } from './studentRepository';
import { ObjectId } from 'mongodb';
import { category } from './../../domain/models/category';
import { Course } from "../../domain/models/course";
import { MongoDBCourse, courseModel } from "../database/courseModel";
import { UpdateResult } from '../../domain/models/update';

export type courseRepository = {
    createCourse : (course : Course) => Promise<Course>;
    fetchCourse : (selectedCategory : string) => Promise<Course[]>;
    fetchCourseData : (id : string) => Promise<Course | undefined>;
    fetchTutorCourses : (tutId:string) => Promise<Course[]>;
    fetchCourseDetails : (id:string) => Promise<Course | null>;
    insertTutorial : (videoLocation:string,thumbnailLocation:string,title:string,description:string,courseId:string,id:Date) => Promise<Course | null | UpdateResult>;
    coursePayment : (id:string,status:boolean,studId:string,fees:number) => Promise<Course | void | UpdateResult>;
    bookmarkCourse : (courseId:string,studId:string) => Promise<Course | void | UpdateResult>;
    removeBookmark : (courseId:string,studId:string) => Promise<Course | void | UpdateResult>;
    fetchSavedCourses : (studId:string) => Promise<Course[]|null>;
    fetchPurchasedCourses : (studId:string) => Promise<Course[]|null>;
    fetchCateData : () => Promise<Course[]|null>;
    fetchGraphDatas : (tutId:string) => Promise<Course[]|null>;
    fetchBarDatas : () => Promise<Course[]|null>;
    editTutorial : (courseId:string,newTitle:string,newDescription:string,ImgLocation:string,VdoLocation:string,img:string,videoUrl:string,vdoId:string,index:number) => Promise<Course[]|null|UpdateResult>
    fetchStudents(tutId:string) : Promise<Course[]>;
  }
export const courseRepositoryImpl = (courseModel:MongoDBCourse):courseRepository=>{
    //Create Course
    const createCourse = async(course:Course):Promise<Course>=>{
        try{
          console.log('okeyyyy');
          console.log('course=',course);
          
        const createdCourse=await courseModel.create(course)
        console.log('hiiii-',createdCourse);
        return createdCourse.toObject();  
        }catch (error) {
            console.error('Error creating course:', error);
            throw error; // or handle the error appropriately
          }
        
    }
    
    //Fetch courses
    const fetchCourse = async(selectedCategory:string):Promise<Course[]>=>{
        // const course = await courseModel.find({category:selectedCategory});
        const course = await courseModel.aggregate([{$match:{category:selectedCategory}},
          {$addFields:{
            tutorsId:{ $toObjectId: "$tutId" }
          }},
          {$lookup: {
            from: "tutors",
            localField: "tutorsId",
            foreignField: "_id",
            as: "Details",
            pipeline:[{$match:{status:true}}]
          }}]);
        // const course = await courseModel.aggregate([{$match:{category:selectedCategory}}]);
        console.log('pppppppppp=',course);
        
        // return course.map((obj)=>obj.toObject());
        return course;
    }

    //Fetch Course Details
    const fetchCourseData = async(id:string):Promise<Course | undefined>=>{
        try{
            const courseData = await courseModel.findOne({_id:new ObjectId(id)});
            // const courseData = await courseModel.({_id:new ObjectId(id)});
            // console.log('cosdata=',courseData);
            return courseData?.toObject();
        }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
        
    }

    //Fetch Courses for Tutor
    const fetchTutorCourses = async(tutId:string):Promise<Course[]>=>{
       try{
         const courseData = await courseModel.find({tutId:tutId});
         return courseData.map((obj)=>obj.toObject());
       }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
    }

    //Fetch Course Details for tutor
    const fetchCourseDetails = async(id:string):Promise<Course | null>=>{
       try{
        const courseData = await courseModel.findOne({_id:new ObjectId(id)});
        return courseData ? courseData.toObject() : null;
       }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
    }

    //Upload tutorial 
    const insertTutorial = async(videoLocation:string,thumbnailLocation:string,title:string,description:string,courseId:string,id:Date):Promise<Course | null | UpdateResult>=>{
      try{
        const tutorial = await courseModel.updateOne({_id:new ObjectId(courseId)},{ $push: { tutorial: {id:id, title: title, description: description, video:videoLocation, thumbnail: thumbnailLocation }}})
        if(tutorial.modifiedCount>0){
          console.log('modifiedcount of add tutorial');
          return tutorial
        } 
        return null
      }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
    }

    //Payment
    const coursePayment = async(id:string,status:boolean,studId:string,fees:number):Promise<Course | void | UpdateResult>=>{
      try{
          const date = new Date();
          const month = new Date().toLocaleString('default',{month:'long'});
          const payment = await courseModel.updateOne(
          {_id:new ObjectId(id)},
          {
          // $set:{paymentStatus:status},
          $push:{students:studId}}
          );
          const pay = await courseModel.updateOne(
            {_id:new ObjectId(id)},
            {$push:{stud:{id:studId,date:date,month:month,fees:fees}}}
          );
          if(payment.modifiedCount>0){
            console.log('modifiedcount blk ok');
            return payment
          }
      }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }

    }

    //Bookmark a course
   const bookmarkCourse = async(courseId:string,studId:string):Promise<Course | void | UpdateResult>=>{
    try{
      const bookmark = await courseModel.updateOne({_id:new ObjectId(courseId)},
      {$push:{bookmarks:studId}});
      if(bookmark.modifiedCount>0){
        return bookmark
      }
    }catch (error) {
            console.error('Error occured:', error);
            throw error; // or handle the error appropriately
          }
   }

   //Remove Bookmareked Courses
   const removeBookmark = async(courseId:string,studId:string):Promise<Course | void | UpdateResult>=>{
    try{
      const bookmark = await courseModel.updateOne({_id:new ObjectId(courseId)},
      {$pull:{bookmarks:studId}});
      if(bookmark.modifiedCount>0){
        return bookmark
      }
    }catch (error) {
      console.error('Error occured:', error);
      throw error; // or handle the error appropriately
    }
   }

  //  Fetch all bookmarked courses
   const fetchSavedCourses = async(studId:string):Promise<Course[]|null>=>{
    try{
      console.log('sidddd=',studId);
      
     const courses = await courseModel.aggregate([
      {
        $match:{
          bookmarks:{$in:[studId]}
        } 
      }
     ])
    //  const courses = await courseModel.aggregate([
    //   {
    //     $match:{
    //       bookmarks:{$in:[studId]}
    //     },
    //     $lookup:{
    //       from:'categories',
    //       localField:'category',
    //       foreignField:'category',
    //       as:'bookmarks'
    //     }
    //   }
    //  ])
     console.log('hhhjjhjhbhjb=',courses);
     
     return courses
    }catch (error) {
      console.error('Error occured:', error);
      throw error; // or handle the error appropriately
    }
   }
    // db.courses.aggregate([{$match:{bookmarks:{$in:['6498151b57fc3aa4b85ead1d']}}},{$lookup:{from:'categories',localField:'category',foreignField:'category',as:'datas'}}])
   
    //Fetch Purchased Courses
   const fetchPurchasedCourses = async(studId:string):Promise<Course[]|null>=>{
    const courses = await courseModel.aggregate([
      {
        $match:{
          students:{$in:[studId]}
        }
      }
     ])
    return courses
   }
   
   //Fetch Category Data and Course
   const fetchCateData = async():Promise<Course[]|null>=>{
    const data = await courseModel.aggregate([{$group:{_id:"$category",count: { $sum: 1 }}}]);
    return data;
   }

   //Fetch Graph Data
   const fetchGraphDatas = async(tutId:string):Promise<Course[]|null>=>{
     const data = await courseModel.aggregate([{
        $match :{tutId:tutId}
    },{
     $unwind:"$stud"
    },
    {$group:{_id:"$stud.month",total:{$sum:"$stud.fees"}}}
  ])
     return data;
   }

   //Fetch Bar Data
   const fetchBarDatas = async():Promise<Course[]|null>=>{
    const data =  await courseModel.aggregate([{
   $unwind:"$stud"  
  },
  {$group:{_id:"$stud.month",total:{$sum:{$multiply:["$stud.fees", 0.05]}}}}
])
   return data;
   }

   //Edit Tutorial
   const editTutorial = async(courseId:string,newTitle:string,newDescription:string,ImgLocation:string,VdoLocation:string,img:string,videoUrl:string,vdoId:string,index:number):Promise<Course[]|null|UpdateResult>=>{
     if(ImgLocation && VdoLocation){
      console.log('vdoooiddd=',vdoId);
      const data = await courseModel.updateOne({_id:new ObjectId(courseId),"tutorial.id":vdoId},
      {$set:{'tutorial.$.title':newTitle,'tutorial.$.description':newDescription,'tutorial.$.thumbnail':ImgLocation,'tutorial.$.video':VdoLocation}},
      )
      console.log('scnddddddddd=',data);
      console.log('!ImgLocation && !VdoLocation');
      return data;
     }
     else if(ImgLocation && !VdoLocation){
      console.log('vdoooiddd=',vdoId);
      const data = await courseModel.updateOne({_id:new ObjectId(courseId),"tutorial.id":vdoId},
      {$set:{'tutorial.$.title':newTitle,'tutorial.$.description':newDescription,'tutorial.$.thumbnail':ImgLocation,'tutorial.$.video':videoUrl}},
      )
      console.log('scnddddddddd=',data);
      console.log('!ImgLocation && !VdoLocation');
      return data;   
     }
     else if(!ImgLocation && VdoLocation){
        console.log('vdoooiddd=',vdoId);
        const data = await courseModel.updateOne({_id:new ObjectId(courseId),"tutorial.id":vdoId},
        {$set:{'tutorial.$.title':newTitle,'tutorial.$.description':newDescription,'tutorial.$.thumbnail':img,'tutorial.$.video':VdoLocation}},
        )
      
        console.log('scnddddddddd=',data);
        console.log('!ImgLocation && !VdoLocation');
        return data;
     }
     else if(!ImgLocation && !VdoLocation){  
        console.log('vdoooiddd=',vdoId);
        const data = await courseModel.updateOne({_id:new ObjectId(courseId),"tutorial.id":vdoId},
        {$set:{'tutorial.$.title':newTitle,'tutorial.$.description':newDescription,'tutorial.$.thumbnail':img,'tutorial.$.video':videoUrl}},
        )
      
        console.log('scnddddddddd=',data);
        console.log('!ImgLocation && !VdoLocation');
        return data;
     }
     return null
   }
   const fetchStudents = async(tutId:string):Promise<Course[]> =>{
    const data = await courseModel.aggregate([
      {$match:{tutId:tutId}},

    ]);
    return data
   }
    return{
        createCourse,    
        fetchCourse,
        fetchCourseData,
        fetchTutorCourses,
        fetchCourseDetails,
        insertTutorial,
        coursePayment,
        bookmarkCourse,
        removeBookmark,
        fetchSavedCourses,
        fetchPurchasedCourses,
        fetchCateData,
        fetchGraphDatas,
        fetchBarDatas,
        editTutorial,
        fetchStudents,
    }
}