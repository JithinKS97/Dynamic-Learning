import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Menu, Button} from 'semantic-ui-react'
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc';

// <ul>
//   {items.map((value, index) => (
//     <SortableItem key={`item-${index}`} index={index} value={value} />
//   ))}
// </ul>


const SortableItem = SortableElement(({slide,slideNo, props}) => {
  return (
    <Menu.Item
     style = {{display:'flex', justifyContent:'space-between'}}
     key = {slideNo}
    >
        <div className="ui button" style = {{width:'100%', textAlign:'left'}} onClick = {()=>{props.saveChanges(undefined, slideNo)}}>{props.showTitle?slide.title:slideNo+1}</div>

        {!props.isPreview?<div className="ui button" onClick = {()=>{

            const confirmation = confirm('Are you sure you want to delete?')

            if(confirmation == true)
                props.delete(slideNo)

        }}>X</div>:null}

    </Menu.Item>
  );
});

const SortableList = SortableContainer(({items}) => {
  return (
    <Menu style = {{display:'flex'}} icon vertical>
        {items}
    </Menu>
  );
});

const List = (props) => {

    const isOwner = Meteor.userId() == props.userId
    const onSortEnd = ({oldIndex, newIndex}) => {
      const slidesCopy = [...props.slides];
      console.log("Old props",slidesCopy);
      console.log(oldIndex, newIndex);
      console.log("New props",arrayMove(slidesCopy, oldIndex, newIndex));
      props.setStateAfterRearranging(arrayMove(slidesCopy, oldIndex, newIndex));
    };
    const renderSlides = () => {

        /* This component is intended for rendering slides list*/

        const slides = props.slides
        if(slides.length!=0) {
            let slideslist = slides.map((slide, index)=>{
                /* There first button is intended for displaying the contents
                   withrespect to the current slide.

                   The second button is intended for the deletion of the slide.

                   Both these operations are not performed here. But the functions
                   that execute the operations are passed.
                */
                if(props.from == 'createLessonplan') {
                  return(
                    <SortableItem key={`item-${index}`} index={index} slideNo={index} slide={slide} props={props}/>
                  )
                }
                else {

                    return (
                        <Menu.Item
                         style = {{display:'flex', justifyContent:'space-between'}}
                         key = {index}
                        >
                            <Button style = {{width:'100%', textAlign:'left'}} onClick = {()=>{props.saveChanges(undefined, index)}}>{props.showTitle?slide.title:index+1}</Button>

                            {Meteor.userId() == props.userId && !props.isPreview?<Button onClick = {()=>{

                                const confirmation = confirm('Are you sure you want to delete?')

                                if(confirmation == true)
                                    props.delete(index)

                            }}>X</Button>:null}

                        </Menu.Item>
                    )
                }
            })
            return slideslist;
        }
    }


    return (
        <SortableList pressDelay={200} items={renderSlides()} onSortEnd={onSortEnd}/>
    )
}

export default List
