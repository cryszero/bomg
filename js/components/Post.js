import React from 'react';

const Post = (props) => {
    return (
        <div>
            {props.posts.map((item, id) => {
                return (
                  <div key={id} className='post'>
                      <h2 className='post__title'>
                          {item.title}
                      </h2>
                      <p className='post__text'>
                          {item.text}
                      </p>
                      <p className='post__date'>
                          {item.date}
                      </p>
                  </div>
                );
            })}
        </div>
    );
};

export default Post;