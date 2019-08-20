import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { DialogueComponent } from '../Dialogue';
import { Dialogue } from './../../store/dialogues/types';
import './ChatsInfo.scss';

const styles = () => ({
  icon: {
    color: '#a1b1cc',
    margin: '8px 0',
    padding: '5px 10px',
  },
});

interface PropsFromState {
  classes: any;
}

interface PropsFromContainer {
  dialogues: Dialogue[];
  userId: string;
  selectedDialogue: string;
  onSelectDialogue(dialogueId: string): void;
}

class ChatsInfoComponent extends Component<PropsFromContainer & PropsFromState> {
  public render() {
    const { dialogues, classes, userId, onSelectDialogue, selectedDialogue } = this.props;

    return (
      <div className='chats'>
        <div className='chats__search'>
          <Search className={classes.icon}/>
          <input type='text' className='chats__input' placeholder='Search in your inbox...'/>
        </div>

        <div className='chats__container'>
          {
            dialogues.map((dialogue: any) =>
              <DialogueComponent
                key={dialogue.DialogueId}
                userId={userId ? userId : null}
                text='gfhgfhfghfg'
                dialogue={dialogue}
                isSelected={selectedDialogue === dialogue._id}
                count={6}
                avatar='https://i.pinimg.com/236x/47/69/f5/4769f534b5cba3b18ba6ab2929802448--t-girls-make-up.jpg'
                // tslint:disable-next-line: jsx-no-lambda
                onSelect={() => onSelectDialogue(dialogue._id)}
              />,
            )
          }
        </div>
      </div>
    );
  }
}

export const ChatsInfo = withStyles(styles as any)(ChatsInfoComponent);
