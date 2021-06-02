 <form method="post" action="{{ route('login') }}">
        @csrf
        <label for="email">Sheno emailin:</label>
        <input type="email" name="email" id="email" class="form-control">

        <label for="password">Sheno fjalekalimin:</label>
        <input type="password" name="password" id="password" class="form-control">

        <input type="submit" value="LOGIN" class="btn btn-primary">

    </form>
