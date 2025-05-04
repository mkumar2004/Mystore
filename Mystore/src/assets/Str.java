import java.util.*;

public class Str {
	public static void main(String [] args) {
		String str;
		int r;
		char ch;
		Scanner scan = new Scanner(System.in);
		System.out.print("Enter a string: ");
		str = scan.nextLine();
		WriteLn("The uppercase is ", str.toUpperCase());
		WriteLn("The Lowercase is", str.toLowerCase());
		if(isPalindrome(str))
			WriteLn("The string is a palindrome");
		else
			WriteLn("The string is not a palindrome");
		for (int i = 0; i < str.length(); i++) {
            		ch = str.charAt(i);
  	       	        r = ch + r; 
        	}
		WriteLn("The reverse is ", str);
	}
	public static void WriteLn(String s, String s2) {
		System.out.println(s + s2);
	}

	public static void WriteLn(String s) {
		System.out.println(s);
	}

	public static boolean isPalindrome(String s) {
	        s = s.toLowerCase();
	        String rev = "";
        	for (int i = s.length() - 1; i >= 0; i--) {
	            rev = rev + s.charAt(i);
	        }
	        return s.equals(rev);
	    }
}