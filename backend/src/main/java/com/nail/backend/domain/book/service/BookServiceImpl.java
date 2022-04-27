package com.nail.backend.domain.book.service;

import com.nail.backend.domain.book.db.entity.Book;
import com.nail.backend.domain.book.db.entity.BookCheck;
import com.nail.backend.domain.book.db.repository.BookCheckRepositorySupport;
import com.nail.backend.domain.book.db.repository.BookRepositorySupport;
import com.nail.backend.domain.book.request.BookPostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    BookRepositorySupport bookRepositorySupport;

    @Autowired
    BookCheckRepositorySupport bookCheckRepositorySupport;

    @Override
    public Book bookRegister(BookPostReq bookPostReq) {
        Book book = bookRepositorySupport.bookRegister(bookPostReq);
        return book;
    }

    @Override
    public BookCheck bookCheck(Long designerSeq, String bookDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(bookDate, formatter);

        BookCheck bookCheck =  bookCheckRepositorySupport.findByDesignerSeqAndBookDate(designerSeq, date);


        return bookCheck;
    }
}
