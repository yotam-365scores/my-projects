using System;

namespace CMSCore.Controllers.Helpers
{
	// todo: not like TS, is wrapping with a new type.
	public struct Union<T1, T2>
	{
		// https://stackoverflow.com/questions/63656390/custom-type-in-c-sharp-similar-to-typescript

		public T1 Left { get; }
		public T2 Right { get; }

		//public bool IsLeft => !IsRight;
		public bool IsRight { get; }

		public Union(T1 left) => (Left, Right, IsRight) = (left, default, false);
		public Union(T2 right) => (Left, Right, IsRight) = (default, right, true);

		public static implicit operator Union<T1, T2>(T1 left) => new Union<T1, T2>(left);
		public static implicit operator Union<T1, T2>(T2 right) => new Union<T1, T2>(right);
	}
}
