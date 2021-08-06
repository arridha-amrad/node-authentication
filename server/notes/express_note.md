> - to create custom error handler you have to use 4 arguments (err, req, res, next).
> - define error-handling middleware last, after other app.use() and routes calls

```typescript
app.use(
  (err: ExceptionType, req: Request, res: Response, next: NextFunction) => {
    return errorMiddleware(err, req, res, next);
  }
);
```

**_Route for testing custom error handler_**

```typescript
app.get('/test', (_, __: Response, next: NextFunction) => {
  // next(new Exception(HTTP_CODE.SERVER_ERROR, 'something went wrong'));
  next(
    new BadRequestException(HTTP_CODE.BAD_REQUEST, [
      {
        message: 'Wrong password',
        field: 'password'
      }
    ])
  );
});
```
