$(document).ready(function(){

    $('.add-more').click(function(e){
        var $noteContainer = $(this).parent().siblings('.notes');
        var title = $(this).siblings('.title').text();
        var i = $noteContainer.find('.note');
        var uniqueId = getUniqueNoteId();
        var initialText = '[' + title + '] ' + "Note "+(i.length+1);
        $noteContainer.append('<div title="click to edit this note" class="note" data-noteid="'+uniqueId+'" ><div class="noteContent">'+initialText+'</div><div class="noteLikes">0</div></div>');
    });

    $('.notes').on('click', '.note', function(){
        openNoteEditor($(this).attr('data-noteid'));
    });

    $('.save-note').click(function(){
        var content = $('.editor textarea').val();
        if (content.trim() != '') {
            saveNote($('.editor').attr('data-editing-id'), content);
            $('.editor-popup').hide();
        } else {
            $('.popup-error').html('<i class="fa fa-warning"></i> Note cannot be empty').show();
        }
    });

    $('.delete-note').click(function(){        
        deleteNote($('.editor').attr('data-editing-id'));
        $('.editor-popup').hide();
    });

    $('.close-editor').click(function(){
        $('.editor-popup').hide();
    });
});

getUniqueNoteId = function() {
    return 'note'+Math.floor((Math.random() * 100000000));
}
openNoteEditor = function(noteId) {
    $('.editor').attr('data-editing-id',noteId);
    $('.editor textarea').val($('.note[data-noteid='+noteId+'] .noteContent').text());
    $('.editor .likesCount').text($('.note[data-noteid='+noteId+'] .noteLikes').text());
    $('.editor-popup').show();
    $('.popup-error').html('').hide();
};

saveNote = function(noteId, content) {
    $('.note[data-noteid='+noteId+'] .noteContent').text(content);
    
}

deleteNote = function(noteId) {
    $('.note[data-noteid='+noteId+']').remove();
};

increaseLikes = function() {
    var likes = parseInt($('.likesCount').text().trim());
    var noteId = $('.editor').attr('data-editing-id');
    $('.likesCount').text(++likes);
    $('.note[data-noteid='+noteId+'] .noteLikes').text(likes);
}